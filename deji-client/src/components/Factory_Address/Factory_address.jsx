import { Box, Typography } from "@mui/material";
import {
  Phone,
  Smartphone,
  Printer,
  Mail,
  MapPin,
} from "lucide-react";

const ContactSection = () => {
  return (
    <Box className="bg-white py-10 px-4 md:px-20">
      {/* Top Contact Info */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-center">
        <Box className="border p-4 rounded-md shadow-sm">
          <Phone className="mx-auto text-red-600 mb-2" size={30} />
          <Typography className="text-gray-700 text-sm font-medium">
            Phone: 0755-84708970
          </Typography>
        </Box>
        <Box className="border p-4 rounded-md shadow-sm">
          <Smartphone className="mx-auto text-red-600 mb-2" size={30} />
          <Typography className="text-gray-700 text-sm font-medium">
            Mobile: +86-13713586498
          </Typography>
        </Box>
        <Box className="border p-4 rounded-md shadow-sm">
          <Printer className="mx-auto text-red-600 mb-2" size={30} />
          <Typography className="text-blue-600 text-sm font-medium">
            whatsapp: +86-13823179226
          </Typography>
        </Box>
        <Box className="border p-4 rounded-md shadow-sm">
          <Mail className="mx-auto text-red-600 mb-2" size={30} />
          <Typography className="text-blue-600 text-sm font-medium">
            Email: sales@batterydeji.com
          </Typography>
        </Box>
      </Box>

      {/* Factory Addresses */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <Box className="border p-6 rounded-md shadow-sm">
          <MapPin className="mx-auto text-red-600 mb-3" size={30} />
          <Typography variant="h6" className="text-black font-semibold mb-2">
            Shenzhen factory address:
          </Typography>
          <Typography className="text-gray-600 text-sm leading-relaxed">
            Shenzhen Factory address: 401, D Building, Jinchangda Industrial
            Park, ShangWei Industrial Road, Zhangkengjing Community, Guanlan
            Street, Longhua District, Shenzhen
          </Typography>
        </Box>
        <Box className="border p-6 rounded-md shadow-sm">
          <MapPin className="mx-auto text-red-600 mb-3" size={30} />
          <Typography variant="h6" className="text-black font-semibold mb-2">
            Dongguan factory address:
          </Typography>
          <Typography className="text-gray-600 text-sm leading-relaxed">
            Dongguan Factory address: A003, Floor 4, Golden Phoenix Park Road,
            Fenggang Town, Dongguan
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactSection;
