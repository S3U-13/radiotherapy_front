"use client";
import { useApiRequest } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";

export default function fieldAndHandleHook({
  loadData,
  userDatas,
  dataManageUser,
}) {
  const { addOrDeleteStaff } = useApiRequest();
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setSelectedUsers(dataManageUser);
  }, [dataManageUser]);

  const handleSelectionChange = async (keys) => {
    let newSelected = [];

    if (keys === "all") {
      newSelected = (userDatas || []).map((item) => ({
        userid: item.userid,
        personid: item.personid,
      }));
    } else {
      newSelected = Array.from(keys).map((key) => {
        const [userid, personid] = key.split("-");
        return {
          userid: Number(userid),
          personid: Number(personid),
        };
      });
    }

    const prevSelected = selectedUsers;

    const added = newSelected.filter(
      (n) =>
        !prevSelected.some(
          (o) => o.userid === n.userid && o.personid === n.personid,
        ),
    );

    const removed = prevSelected.filter(
      (o) =>
        !newSelected.some(
          (n) => n.userid === o.userid && n.personid === o.personid,
        ),
    );

    setSelectedUsers(newSelected);

    if (added.length === 0 && removed.length === 0) return;

    try {
      if (added.length > 0) {
        await addOrDeleteStaff({
          type: "add",
          users_data: added,
        });
      }

      if (removed.length > 0) {
        await addOrDeleteStaff({
          type: "delete",
          users_data: removed,
        });
      }

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectedUsers,
    setSelectedUsers,
    handleSelectionChange,
  };
}
