"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-wrap">
      <input {...props} className="input" type={show ? "text" : "password"} />
      <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((s) => !s)}>
        <Icon name={show ? "eyeOff" : "eye"} size={20} />
      </button>
    </div>
  );
}
