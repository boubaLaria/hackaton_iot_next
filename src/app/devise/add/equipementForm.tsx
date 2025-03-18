"use client";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { useState } from "react";
import { PasswordIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export default function EquipementForm() {
  const [data, setData] = useState({
    name: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can remove this code block
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

  return (
    <>
      <ShowcaseSection title="Ajouter un équipement" className="!p-6.5">
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
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Ajouter l'équipement
          </button>
        </form>
      </ShowcaseSection>
    </>
  );
}
