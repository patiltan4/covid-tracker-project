import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    Total : {total}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
