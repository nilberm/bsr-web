import SettingsMenu from "@/components/features/settings/SettingsMenu";
import Header from "@/components/shared/Header";

export default function Settings() {
  return (
    <main className="flex flex-col w-full ">
      <Header backBtn={false} pageName="Settings" />
      <SettingsMenu />
    </main>
  );
}
