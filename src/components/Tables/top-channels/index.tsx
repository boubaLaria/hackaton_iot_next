import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getTopChannels } from "../fetch";
import Link from "next/link";

export async function TopChannels({ className }: { className?: string }) {
  const data = await getTopChannels();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Équipements
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] !text-left">
              Nom de l'équipement
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="!text-right">État</TableHead>
            <TableHead>Créateur</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((channel, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={channel.name + i}
            >
              <TableCell className="flex min-w-fit items-center gap-3">
                <div className="">{channel.name}</div>
              </TableCell>

              <TableCell>{channel.type}</TableCell>

              {channel.state ? (
                <TableCell className="!text-right text-green-light-1">
                  ON
                </TableCell>
              ) : (
                <TableCell className="!text-right text-red">OFF</TableCell>
              )}

              <TableCell>
                {channel.user.first_name + " " + channel.user.last_name}
              </TableCell>
              <TableCell>
                <Link
                  href={`/devise/${channel.id}/edit`}
                  className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                >
                  Modifier
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
