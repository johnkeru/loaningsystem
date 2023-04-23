import { Grid, Typography } from '@mui/material'
import React from 'react'
import CardDialog from './CardDialog'

const Card = ({src, title}) => {
  return (
    <Grid
        width={400}
        height={300}
        mb="30px"
        position="relative"
        boxShadow={3}
        sx={{
            ":hover": {
                boxShadow: 10,
            },
        }}
    >
        <img
            src={src}
            alt=""
            width="100%"
            height="100%"
            style={{ blur }}
        />

        <Grid
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0, .3)",
                ":hover": {
                    background: "rgba(0,0,0,.1)",
                },
            }}
        />

        <Grid
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
           <CardDialog title={title}/>
        </Grid>

        <Grid />
    </Grid>
  )
}

export default Card