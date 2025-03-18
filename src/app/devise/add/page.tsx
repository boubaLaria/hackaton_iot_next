import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import  EquipementForm  from "./equipementForm";

export const metadata: Metadata = {
  title: "Ajouter un equipement",
};

export default async function Page() {
  return (
    <>
      <Breadcrumb pageName="Ajout d'un equipement" />

      <div className="grid ">
        <div className="flex flex-col">
          <EquipementForm />
        </div>   
      </div>
    </>
  );
}
