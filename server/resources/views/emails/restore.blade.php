<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Usuario Creado Exitosamente</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
    <div class="pt-5 mt-5 container">
        <div class="row">
            <div
                class="col-xs-6 col-sm-6 col-md-6 col-lg-6 offset-xs-3 offset-sm-3 offset-md-3 offset-lg-3 text-center pt-3">
                <form class="form-signin">
                    <img class="mb-2" src="http://ordenes.online/assets/images/logo.png" alt=""
                        style="witdh:6rem;height:5rem;">
                    <h1 class="h3 mb-3 font-weight-normal text-left text-dark">Hola {!! $name !!}, puedes
                        reestablecer tu contraseña dando click en el boton abajo:</h1>
                    <div class="input-group mb-1 alert alert-info text-center mx-auto">
                        <h2 class="text-center px-auto">
                            {!! $email !!}
                        </h2>
                    </div>
                    <div class="mb-3 row">
                        <div
                            class="mx-auto col-xs-10 col-sm-10 col-md-10 col-lg-10 offset-xs-10 offset-sm-10 offset-md-10 offset-lg-10 text-center ">
                            Recientemente solicitaste un cambio de contraseña en nuestro sitio, si no reconoces esta
                            accion, deberias cambiar tu contraseña ahora.
                        </div>
                    </div>
                    <a class="btn btn-lg btn-primary btn-block" href="{!! $url !!}{!! $uuid !!}"
                        target="_blank"><i class="fa fa-sign-in"></i> Cambiar Contraseña</a>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
