import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  footer: {
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 20,
    textAlign:'right'
  },
});

export default function  Footer() {
  const classes = useStyles();
  return (
    <footer className="footer">
      <div className="container">
        <div className= {classes.footer}>
          <div className="col">
            Designed By
            <a className="text-decoration-none" href="https://gitlab.com/Taufiq">
                &copy;Jonathan Marin.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};