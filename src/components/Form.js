
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Modal, Paper, Typography, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import FCheckbox from './form/FCheckbox';
import FormProvider from './form/FormProvider';
import FTextField from './form/FTextField';


export default function Form() {
    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();
    let from = location.state?.from?.pathname || "/";
    
    function onDismiss() {
        navigate(-1);
    }
    const defaultValues = {
        email: "viethanguyen0809@gmail.com",
        password: "1234",
        remember: true,
    };
    const methods = useForm({ defaultValues });

    const { 
             handleSubmit, 
             formState: { errors, isSubmitting },
          } = methods;
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = (data) => {
        auth.signIn(data.email, () => {
            navigate(from, { replace: true })
        })
    }

    return (
    <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby='modal-modal-description'
        onBackdropClick={() => onDismiss()}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
            outline: "0"
        }}
    >
        <Box>
            <Paper
                 elevation={8}
                 style={{
                    borderRadius: "20px"
                 }}
            >
                <div style={{ padding: "3rem" }}>
                    <Typography
                        color="secondary"
                        variant='h3'
                        textAlign="center"
                        mb={3}
                        className="title-login"
                    >
                       Log In
                    </Typography>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}
                    >
                        <Stack spacing={3} xs={3}>
                            {!!errors.afterSubmit && (
                                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                            )}
                            <FTextField name="email" label="Email address"/>
                            <FTextField
                                 name="password"
                                 label="Password"
                                 type={showPassword ? "text" : "password"}
                                 InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                color='secondary'
                                                aria-label='toggle password visibility'
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                 }}
                            />
                        </Stack>
                        <Stack>
                            <FCheckbox name="remember" label="Remember me"/>
                        </Stack>
                        <Stack>
                            <LoadingButton
                                size='large'
                                type='submit'
                                variant='contained'
                                color='secondary'
                                loading={isSubmitting}
                            >
                                Log In
                            </LoadingButton>
                        </Stack>
                    </FormProvider>
                </div>
            </Paper>
        </Box>
    </Modal>
  )
}
