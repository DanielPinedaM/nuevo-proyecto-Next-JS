import FormLogin from "./formLogin";

export default function Page() {
  return (
    <section
      className="w-full h-screen bg-no-repeat bg-fixed bg-origin-border bg-bottom"
    >
      <div className="flex justify-center">
        <div
          style={{
            boxShadow:
              " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          }}
          className="flex flex-col items-center h-fit mx-2 basis-[460px] rounded-xl mt-3 xsm:mt-6 p-4"
        >
          <div className="xsm:w-[70%]">
            <h1 className="text-dark-blue text-center text-[25px] leading-6 font-medium mb-5">
              <span className="block">Bienvenido a</span>
              <span>AudicuentasMED</span>
            </h1>

            <FormLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
