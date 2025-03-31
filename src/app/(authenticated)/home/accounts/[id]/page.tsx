"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import Header from "@/components/shared/Header";
import { FaEdit, FaWallet } from "react-icons/fa";
import { Account } from "@/types/account";
import { FiSave } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function AccountDetailPage() {
  const params = useParams();
  const accountId = params.id;
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        const res = await api.get(`/accounts/${accountId}`);
        setAccount(res.data);
        setEditedName(res.data.name);
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      } finally {
        setLoading(false);
      }
    };

    getAccountDetails();
  }, [accountId]);

  const handleSave = async () => {
    try {
      await api.put(`/accounts/${accountId}`, { name: editedName });
      setAccount((prev) => (prev ? { ...prev, name: editedName } : prev));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(account?.name || "");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Account not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Header backBtn={true} pageName="Account Details" />

      <div className="rounded-lg flex flex-col w-full p-8">
        <section className="bg-zinc-50 p-6 rounded-md shadow flex flex-col gap-6">
          {/* Account Name */}
          <div className="flex justify-between items-end">
            <div>
              <label className="text-gray-600 text-sm">Account Name</label>
              {isEditing ? (
                <input
                  className="mt-1 p-2 border rounded w-full"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {account.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    className="text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={handleSave}
                  >
                    <FiSave className="inline mr-1" /> Save
                  </button>
                  <button
                    className="text-sm px-4 py-2 bg-red-500 text-gray-50 rounded hover:bg-red-700"
                    onClick={handleCancelEdit}
                  >
                    <RxCross2 className="inline" />
                  </button>
                </>
              ) : (
                <button
                  className="text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="inline mr-1" /> Edit
                </button>
              )}
            </div>
          </div>

          {/* Account Icon */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-2">Account Icon</label>
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <FaWallet className="text-2xl text-gray-600" />
              </div>
            </div>
            <button
              className="text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={() => {}}
            >
              Choose Icon
            </button>
          </div>

          {/* Delete Button */}
          <button
            disabled={account.isDefault}
            className={`w-full text-sm px-4 py-2 rounded font-semibold text-white mt-4 ${
              account.isDefault
                ? "bg-gray-400 !cursor-not-allowed hover:!cursor-not-allowed"
                : "bg-red-700 hover:bg-red-700"
            }`}
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
