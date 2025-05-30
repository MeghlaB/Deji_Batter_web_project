import { Typography, Box, Grid, Paper } from "@mui/material";

const certificates = [
  { label: "PSE", img: "https://www.dejibattery.com/uploadfile/2020/12/31/20201231151733eZYSvK.jpg" },
  { label: "CB", img: "https://www.dejibattery.com/uploadfile/2020/12/31/20201231151821iHorhO.jpg" },
  { label: "CE", img: "https://www.dejibattery.com/uploadfile/2020/12/31/20201231151844iKNYCo.jpg" },
  { label: "SGS", img: "https://www.dejibattery.com/uploadfile/2020/12/31/1609399174118820.jpg" },
  { label: "FCC", img: "https://www.dejibattery.com/uploadfile/2020/12/31/20201231151948JCA8fq.jpg" },
  { label: "KC", img: "https://www.dejibattery.com/uploadfile/2020/12/31/20201231152016lnoJ0Z.jpg" },
];

const CertificateSection = () => {
   return (
    <Box className="bg-white py-10 px-4 md:px-20">
      {/* Section Title */}
      <Typography
        variant="h6"
        className="mb-6 text-gray-700 font-semibold"
        style={{ borderBottom: "3px solid #ccc", width: "fit-content" }}
      >
        Certificate & Patent
      </Typography>

      {/* Grid layout */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <Box key={index} className="text-center">
            <img
              src={cert.img}
              alt={cert.label}
              className="w-full h-64 object-contain mx-auto border border-gray-200 shadow-sm rounded-md"
            />
            <Typography
              variant="body2"
              className="mt-2 text-sm font-medium text-gray-700"
            >
              {cert.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CertificateSection;
