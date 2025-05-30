import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

const Companyinfo = () => {
  const theme = useTheme();

  return (
    <div className="mt-4">
      <Paper elevation={4} sx={{ p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={4}
    
          textAlign="left"
        >
          Company Information
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="center"
        >
          {/* Text Content */}
          <Box flex={1}>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              Shenzhen HuidaFa (DEJI Battery) Technology Co., Ltd., established
              in 2006, specializes in a wide range of high-tech consumer
              electronics. Our portfolio includes mobile phone batteries
              (compatible with major brands like iPhone, Samsung, Huawei,
              Xiaomi, LG, Sony, and Oppo), iPad batteries, wireless charging
              equipment, and power banks.
              <br />
              <br />
              In 2009, we launched our “DEJI” brand and rapidly expanded,
              establishing a network of hundreds of agents worldwide, making
              DEJI a globally recognized name in communication power solutions.
              <br />
              <br />
              Our commitment to quality is evidenced by our ISO9001
              certification. We adhere to international standards, with our
              products receiving CE, FCC, ROHS, TUV US, PSE, KC, TIS, MSDS,
              UN38.3, CB-IECEE, and IEC62133 certifications, ensuring they meet
              the diverse and stringent requirements of our global clientele.
              <br />
              <br />
              We have forged long-standing relationships with clients across
              various regions including Turkey, Russia, the United States,
              Germany, the UK, Italy, France, Japan, South Korea, Vietnam,
              Thailand, Cambodia, Saudi Arabia, and Southeast Asia.
            </Typography>
          </Box>

          {/* Image */}
          <Box flex={1}>
            <img
              src="https://www.dejibattery.com/uploadfile/2023/06/27/1687856580471207.jpg"
              alt="DEJI Company Building"
              style={{
                width: "100%",
                maxHeight: "360px",
                objectFit: "cover",
                borderRadius: 16,
                boxShadow: theme.shadows[3],
              }}
            />
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Companyinfo;
