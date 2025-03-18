import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EquipementForm from "../../add/equipementForm";
import { getDevices } from ".";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = await params; // Destructure `id` from `params` to ensure it's awaited properly.
  const initialData = await getDevices(id);

  return (
    <>
      <Breadcrumb pageName="Modifier un équipement" />
      <div className="grid">
        <div className="flex flex-col">
          <EquipementForm
            is_edit={true}
            id_parms={id} 
            initialData={initialData}
          />
        </div>
      </div>
    </>
  );
}
