import { FaGithub, FaGoogle } from "react-icons/fa";

import { LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

const SocialAuth = () => {
  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex justify-between   flex-col md:flex-row">
      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="flex items-center  py-2 px-12 rounded-sm gap-2 border border-neutral-600  "
      >
        <FaGithub />
        <span>Github</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="flex items-center  py-2 px-12 rounded-sm gap-2 border border-neutral-600 "
      >
        <FaGoogle />
        <span>Google</span>
      </button>
    </div>
  );
};

export default SocialAuth;
