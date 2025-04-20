import DataActions from "@/components/features/settings/DataActions";
import Header from "@/components/shared/Header";

export default function DataManagement() {
  return (
    <div className="flex flex-col w-full">
      <Header pageName="Data Management" backBtn={true} />
      <DataActions />
    </div>
  );
}
