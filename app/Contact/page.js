"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Get in Touch
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
          Have questions about Qmenu? Want to discuss enterprise solutions?
          Our team is ready to help you transform your restaurant management.
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    type="email"
                    {...register("email", { required: "Valid email is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <TextField
                    label="Message"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    {...register("message", { required: "Message is required" })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: "primary.main", color: "white" }}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <Typography variant="body2" color="textSecondary">📍 123 Restaurant Row, New York, NY 10001</Typography>
                <Typography variant="body2" color="textSecondary">📞 +1 (555) 123-4567 (Mon-Fri, 9am-5pm EST)</Typography>
                <Typography variant="body2" color="textSecondary">✉️ support@qmenu.com | sales@qmenu.com</Typography>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Our Location</Typography>
                <div className="bg-gray-100 h-64 rounded-lg overflow-hidden flex items-center justify-center text-gray-500">
                  Map Placeholder
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;