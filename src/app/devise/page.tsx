import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { TopChannels } from "@/components/Tables/top-channels";
import Link from "next/link";
import { Suspense } from "react";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";

export const metadata: Metadata = {
  title: "Ajouter un equipement",
};

export default async function Page() {
  return (
    <>
      <Breadcrumb pageName="Ajout d'un equipement" />

      <div className="">
        <div className="mb-4 flex justify-end">
          <Link
            href="/devise/add"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Ajouter un équipement
          </Link>
        </div>
      </div>
      <div className="space-y-10 pt-4">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>
      </div>
    </>
  );
}
