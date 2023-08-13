
const Footer = () => {
  return (
    <footer className="bg-footer text-white py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mx-8">
        <div className="mb-4 ml-0 md:ml-4 md:mb-0">
          <img src="/agc_logo.png" width={100} height={50} alt="AGC Logo" />
        </div>
        <div className="mb-6 md:mb-0 md:text-left">
          <p className="text-center text-white  mb-2">
            2023 © Mentalome is freely available for non-commercial use with
            proper citations.
          </p>
          <a
            href="https://bioinformatics.um6p.ma"
            target="_blank"
            className="text-center text-white underline flex justify-center items-center"
          >
            bioinformatics.um6p.ma
          </a>
        </div>
        <div className="mb-4 mr-0 md:mr-20 md:mb-0">
          <img src="/um6p_logo.png" width={100} height={50} alt="UM6P Logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
