export default function Example() {
  return (
    <>
      <section className="min-h-screen flex text-white">
        <div
          className="flex justify-center lg:w-full bg-no-repeat bg-cover relative items-center animate__animated animate__fadeInLeft"
          style={{
            backgroundImage:
              "url(https://media.tenor.com/bDlzu1tRfowAAAAd/negrito-llorando-african-kid-crying.gif)",backgroundSize: "cover",
            height: "100vh", 
            width: "100%",
          }}
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              PAGINA EN DESARROLLO 🥲
            </h1>
            <p className="italic text-3xl my-4 font-extralight">
              ¡Estamos trabajando en ello! Pronto estará disponible mi hermano.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}



