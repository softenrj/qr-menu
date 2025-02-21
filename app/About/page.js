"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar } from "@mui/material";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
        <Navbar />
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Have questions or feedback? Reach out to us!
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ my: 3 }}>
          <Grid item xs={12} sm={4} textAlign="center">
            <FaEnvelope size={24} color="#1976d2" />
            <Typography variant="body2" color="textSecondary">support@freelan.com</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <FaPhone size={24} color="#1976d2" />
            <Typography variant="body2" color="textSecondary">+1 (555) 123-4567</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <FaMapMarkerAlt size={24} color="#1976d2" />
            <Typography variant="body2" color="textSecondary">123 Freelan Street, Tech City</Typography>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Send Message
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={submitted}
        autoHideDuration={3000}
        message="Message sent successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      
    </Container>
    <Footer />
    </div>
  );
};

export default Contact;