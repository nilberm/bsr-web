import Header from "@/components/Header";
import AccountInfo from "@/components/Home/AccountInfo/indes";

interface AccountProps {
  id: number;
  name: string;
  currentBalance: number;
}

export default function Accounts() {
  const accounst = [
    {
      id: 1,
      name: "Initial Account",
      currentBalance: 2000,
    },
    {
      id: 2,
      name: "Second Account",
      currentBalance: 0,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <Header backBtn={true} pageName="Accounts" />

      <div className="flex flex-col w-full p-8">
        <div className="flex flex-col gap-4">
          {accounst.map((account: AccountProps) => {
            return <AccountInfo key={account.id} accounts={account} />;
          })}
        </div>
      </div>
    </div>
  );
}
