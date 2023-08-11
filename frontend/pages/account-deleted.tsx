import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function AccountDeleted() {
  const router = useRouter();
  const isSuccess = router.query.success;

  if (!isSuccess) {
    router.replace("/");
  }

  return (
    <div className="flex flex-col justify-center items-center text-white text-2xl">
      <p>Thank you for being a part of our community!</p>
      <p>*****************</p>
      <p>(￣^￣ )ゞ</p>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AccountDeleted), {
  ssr: false,
});
