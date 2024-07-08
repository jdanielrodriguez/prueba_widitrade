<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="es">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <!--  compatibilidad inicio -->

    <!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <!--  compatibilidad fin -->

    <title>Autorizaci&oacute;n de Cotizaci&oacute;n</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!--  compatibilidad inicio -->

    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />

    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->

    <!--  compatibilidad fin -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <!--[if IEMobile 7]>
 <style type="text/css">
  /* Targeting Windows Mobile */
 </style>
 <![endif]-->
    <!--[if gte mso 9]>
 <style>
  /* Target Outlook 2007 and 2010 */
 </style>
 <![endif]-->
</head>

<body>
    <table class="pt-5 mt-5 container">
        <tr class="row">
            <td
                class="col-xs-6 col-sm-6 col-md-6 col-lg-6 offset-xs-3 offset-sm-3 offset-md-3 offset-lg-3 text-left pt-3">
                <form class="form-signin">
                    <table>
                        <tr>
                            <td>
                                <img class="mb-2" src="https://via.placeholder.com/500x250.png?text=LOGO"
                                    alt="" style="witdh:175px;height:150px;">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1 class="h3 mb-3 font-weight-normal text-left  text-dark">{!! $name !!}, tus
                                    datos de acceso son:
                                </h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="input-group mb-1 alert alert-info text-center mx-auto">
                                    <h2 class="text-center px-auto">
                                        Usuario: {!! $username !!}
                                    </h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div
                                    class="ml-3 col-xs-10 col-sm-10 col-md-10 col-lg-10 offset-xs-10 offset-sm-10 offset-md-10 offset-lg-10 text-left ">
                                    <h2>
                                        Bienvenido
                                    </h2>
                                </div>
                                <a class="btn btn-lg btn-primary btn-block" href="{!! $url !!}"
                                    target="_blank"><i class="fa fa-sign-in"></i>
                                    Ingresa Ahora</a>
                            </td>
                        </tr>
                    </table>
                </form>
            </td>
        </tr>

    </table>
</body>

</html>
