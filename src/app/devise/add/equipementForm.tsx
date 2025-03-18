"use client";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { useState, useEffect } from "react";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRouter } from "next/navigation";

interface EquipementFormProps {
  initialData?: {
    name: string;
    type: string;
    id_equipement: string;
  };
  is_edit?: boolean;
  id_parms?: string;
}

export default function EquipementForm({
  initialData,
  id_parms,
  is_edit: is_edit = false,
}: EquipementFormProps) {
  
  const [data, setData] = useState({
    name: "",
    type: "",
    id_equipement: "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleEditSubmit = async (formData: any) => {
    try {
      const response = await fetch(`/api/equipement/edit/${id_parms}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Equipment updated successfully");
      } else {
        console.error("Failed to update equipment");
      }
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };
  const handleAddSubmit = async (data:any) => {

    setLoading(true);
    try {
      const response = await fetch("/api/equipement/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datas = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        setLoading(false);
        router.push("/devise");
      }
      router.push("/devise");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (is_edit) {
      handleEditSubmit(data);
    }else{
      handleAddSubmit(data);
    }
  };

  return (
    <>
      <ShowcaseSection
        title={initialData ? "Modifier un équipement" : "Ajouter un équipement"}
        className="!p-6.5"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
            <InputGroup
              label="Nom de l'équipement"
              name="name"
              type="text"
              placeholder="Entrez le nom de l'équipement"
              className="w-full xl:w-1/2"
              handleChange={handleChange}
              value={data.name}
            />

            <InputGroup
              label="Type"
              name="type"
              type="text"
              placeholder="Entrez le type de l'équipement"
              className="w-full xl:w-1/2"
              handleChange={handleChange}
              value={data.type}
            />
            <InputGroup
              label="id_equipement"
              name="id_equipement"
              type="text"
              placeholder="L'identifiant de l'équipement"
              className="w-full xl:w-1/2"
              handleChange={handleChange}
              value={data.id_equipement}
            />
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            {initialData ? "Modifier l'équipement" : "Ajouter l'équipement"}
          </button>
        </form>
      </ShowcaseSection>
    </>
  );
}
