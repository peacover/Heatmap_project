import Spline from "@splinetool/react-spline";

const Header = () => {
  return (
    <>
      <nav className="sticky top-0 bg-bg_header z-50">
        <div className="mx-auto p-6 px-8">
          <div className="flex justify-center items-center">
            <a href="/">
              <img
                src="/Heatmap_logo.svg"
                alt="Heatmap Logo"
                width={200}
                height={100}
              />
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <section
          id="home"
          className="relative order-2 md:order-1 pb-16 md:py-16"
        >
          <div className="container">
            <div className="text-center md:ml-[120px]">
              <h1 className="text-2xl font-semibold leading-tight text-black md:text-3xl lg:text-4xl">
                <span className="text-accent font-bold">Mentalome: </span> Unveiling the
                Complex Landscape of Psychiatric Disorders through Comprehensive
                Transcriptome Analysis
              </h1>
            </div>
          </div>
        </section>
        <Spline
          className="max-w-5xl mx-auto order-1 mt-16 md:mt-0 md:mx-0 md:order-2"
          scene="https://prod.spline.design/dXBzmLGIHCotPwaw/scene.splinecode"
        />
      </div>
    </>
  );
};

export default Header;