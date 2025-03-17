"use client";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { useState } from "react";
import { PasswordIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can remove this code block
    setLoading(true);
    try {
      const response = await fetch("/api/public/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datas = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        setLoading(false);
        router.push("/auth/sign-in");
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup
            type="first_name"
            label="Nom"
            className="mb-4 [&_input]:py-[15px]"
            placeholder="Enter your email"
            name="first_name"
            handleChange={handleChange}
            value={data.first_name}
          />

          <InputGroup
            type="last_name"
            label="Prenom"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="last_name"
            handleChange={handleChange}
            value={data.last_name}
          />
          <InputGroup
            type="email"
            label="email"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="email"
            handleChange={handleChange}
            value={data.email}
          />
          <InputGroup
            type="phone"
            label="phone"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="phone"
            handleChange={handleChange}
            value={data.phone}
          />
          <InputGroup
            type="password"
            label="password"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="password"
            handleChange={handleChange}
            value={data.password}
            icon={<PasswordIcon />}
          />

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Sign up
              {loading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
