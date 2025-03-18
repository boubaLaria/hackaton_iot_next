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

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <EquipementForm />
        </div>   
      </div>
    </>
  );
}
