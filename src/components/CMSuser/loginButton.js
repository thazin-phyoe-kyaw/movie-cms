"use client";
import { Button } from "antd";
import { signOut } from "next-auth/react";

function LogOutButton() {
  return (
    <Button type="link" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}

export { LogOutButton };
