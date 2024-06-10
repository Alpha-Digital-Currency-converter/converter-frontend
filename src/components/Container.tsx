export function Container(props: any) {
  return (
    <main
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center"
      style={{ backgroundImage: "url(/background.svg)" }}
    >
      {props.children}
    </main>
  );
}
