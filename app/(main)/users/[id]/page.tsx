import UserForm from "@/components/UserForm";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserForm id={params.id} title="Update User" />
    </>
  );
}
