/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) 
  {

    var that = this; //a reference to ourselves
	
    var settings = 
	{
      css: "trn",
      lang: "es",
      t: 
	  {
        "Usuario": 
		{
          es: "Usuario",
          en: "User"
        },
		"Iniciar sesión": 
		{
          es: "Iniciar sesión",
          en: "Log in"
        },
		"Correo electrónico": 
		{
          es: "Correo electrónico",
          en: "E-mail"
        },
		"Contraseña": 
		{
          es: "Contraseña",
          en: "Password"
        },
		"La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.": 
		{
          es: "La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.",
          en: "The password must contain at least 8 characters, including uppercase letters, lowercase letters and numbers."
        },
		"Crear una cuenta nueva": 
		{
          es: "Crear una cuenta nueva",
          en: "Create a new account"
        },
		"Iniciar sesión": 
		{
          es: "Iniciar sesión",
          en: "Log in"
        },
		"Registrarse": 
		{
          es: "Registrarse",
          en: "Sign up"
        },
		"¿Olvidaste tu contraseña?": 
		{
          es: "¿Olvidaste tu contraseña?",
          en: "Forgot password?"
        },
		"¡Bienvenido!": 
		{
          es: "¡Bienvenido!",
          en: "Welcome!"
        },
		"Inicio de sesión exitoso.": 
		{
          es: "Inicio de sesión exitoso.",
          en: "Succesful log in;"
        },
		"Correo y/o contraseña incorrectos.": 
		{
          es: "Correo y/o contraseña incorrectos.",
          en: "Wrong e-mail and/or password"
        },
		"Error":
		{
			es: "Error",
			en: "Error"
		},
		"Sesión cerrada": 
		{
          es: "Sesión cerrada",
          en: "Session closed"
        },
		"Error al cerrar sesión": 
		{
          es: "Error al cerrar sesión",
          en: "Error login out"
        },
		"¡Gracias por Registrarte!": 
		{
          es: "¡Gracias por Registrarte!",
          en: "Thanks for signing up!"
        },
		"Mensaje enviado": 
		{
          es: "Mensaje enviado",
          en: "E-mail sent"
        },
		"Sencillo": 
		{
          es: "Sencillo",
          en: "One way"
        },
		"Redondo": 
		{
          es: "Redondo",
          en: "Round trip"
        },
		"Tipo": 
		{
          es: "Tipo",
          en: "Type"
        },
		"Origen": 
		{
          es: "Origen",
          en: "Origin"
        },
		"Destino": 
		{
          es: "Destino",
          en: "Destination"
        },
		"Ciudad de México": 
		{
          es: "Ciudad de México",
          en: "Mexico City"
        },
		"Pasajeros": 
		{
          es: "Pasajeros",
          en: "Passengers"
        },
		"¡Descubre!": 
		{
          es: "¡Descubre!",
          en: "¡Discover!"
        },
		"Nuestras disculpas. No puede llevar bebes en clase VIP.":
		{
			es: "Nuestras disculpas. No puede llevar bebes en clase VIP.",
			en: "Our apologies. You can't bring babies in the VIP class."
		},
		"pasajero(s)": 
		{
          es: "pasajero(s)",
          en: "passenger(s)"
        },
		"Adultos": 
		{
          es: "Adultos",
          en: "Adults"
        },
		"Menores": 
		{
          es: "Menores",
          en: "Minors"
        },
		"Bebes": 
		{
          es: "Bebes",
          en: "Infants"
        },
		"Clase": 
		{
          es: "Clase",
          en: "Class"
        },
		"VIP": 
		{
          es: "VIP",
          en: "VIP"
        },
		"Ejecutivo": 
		{
          es: "Ejecutivo",
          en: "Executive"
        },
		"Turista": 
		{
          es: "Turista",
          en: "Economy class"
        },
		"Fecha de Salida": 
		{
          es: "Fecha de Salida",
          en: "Departing date"
        },
		"Fecha de Regreso": 
		{
          es: "Fecha de Regreso",
          en: "Return date"
        },
		"Buscar Vuelos": 
		{
          es: "Buscar Vuelos",
          en: "Search flights"
        },
		"Col. Nueva Villahermosa": 
		{
          es: "Col. Nueva Villahermosa",
          en: "Suburb Nueva Villahermosa"
        },
		"Calle Progreso #120 Piso 7": 
		{
          es: "Calle Progreso #120 Piso 7",
          en: "Progreso street #120 7th floor"
        },
		"Contacto (993) 297 82 61": 
		{
          es: "Contacto (993) 297 82 61",
          en: "Contact us (993) 297 82 61"
        },
		"Por favor, ingrese todos los datos": 
		{
          es: "Por favor, ingrese todos los datos",
          en: "Please fill all the data."
        },
		"Asientos": 
		{
          es: "Asientos",
          en: "Seats"
        },
		"Check-in": 
		{
          es: "Check-in",
          en: "Check-in"
        },
		"Ingrese sus datos": 
		{
          es: "Ingrese sus datos",
          en: "Fill with your data"
        },
		"Número de boleto": 
		{
          es: "Número de boleto",
          en: "Ticket number"
        },
		"Continuar": 
		{
          es: "Continuar",
          en: "Continue"
        },
		"Consigue tu pase de abordar electronico para ahorrar tiempo": 
		{
          es: "Consigue tu pase de abordar electronico para ahorrar tiempo",
          en: "Get your electronic pass board to save time"
        },
		"Confirmado": 
		{
          es: "Confirmado",
          en: "Confirmed"
        },
		"Gracias por su preferencia": 
		{
          es: "Gracias por su preferencia",
          en: "Thanks for your preference"
        },
		"Hemos adjuntado a este correo su pase de abordar": 
		{
          es: "Hemos adjuntado a este correo su pase de abordar",
          en: "We have attached your pass board in this mail"
        },
		"recuerda": 
		{
          es: "recuerda",
          en: "remember"
        },
		"imprimir y tener a la mano su pase para poder abordar su vuelo": 
		{
          es: "imprimir y tener a la mano su pase para poder abordar su vuelo",
          en: "to print and bring your pass so you can board your flight"
        },
		"Aeroalpes ®  - Grupo Alpes": 
		{
          es: "Aeroalpes ®  - Grupo Alpes",
          en: "Aeroalpes ®  - Alpes Group"
        },
		"Registrado": 
		{
          es: "Registrado",
          en: "Logged in"
        },
		"¡Bienvenido a Aeroalpes!": 
		{
          es: "¡Bienvenido a Aeroalpes!",
          en: "Welcome to Aeroalpes!"
        },
		"gracias por registrarte": 
		{
          es: "gracias por registrarte",
          en: "thanks for signing up"
        },
		"ahora tienes acceso a muchos de nuestros servicios": 
		{
          es: "ahora tienes acceso a muchos de nuestros servicios",
          en: "now you have access to many of our services"
        },
		"¡Buen viaje!": 
		{
          es: "¡Buen viaje!",
          en: "Good trip!"
        },
		"Vuelos": 
		{
          es: "Vuelos",
          en: "Flights"
        },
		"Nombre": 
		{
          es: "Nombre",
          en: "First name"
        },
		"Apellidos": 
		{
          es: "Apellidos",
          en: "Last name"
		},
		"Número de tarjeta": 
		{
          es: "Número de tarjeta",
          en: "Card number"
        },
		"Expiración": 
		{
          es: "Expiración",
          en: "Expiration"
        },
		"CVV": 
		{
          es: "CVV",
          en: "CVV"
        },
		"Pagar": 
		{
          es: "Pagar",
          en: "Pay"
        },
		"Seleccione el vuelo que desee para cada trayecto": 
		{
          es: "Seleccione el vuelo que desee para cada trayecto",
          en: "Select the flight you´ll attend for each trip"
        },
		"!Imprime tu pase de abordar!": 
		{
          es: "!Imprime tu pase de abordar!",
          en: "!Print your board pass!"
        },
		"Presione para confirmar su boleto con el número": 
		{
          es: "Presione para confirmar su boleto con el número",
          en: "Press to confirm your ticket with the identification number"
        },
		"Se enviará el pase de abordar a su correo": 
		{
          es: "Se enviará el pase de abordar a su correo",
          en: "The pass board will be sent to your mail"
        },
		"No se encontro el boleto con el número": 
		{
          es: "No se encontro el boleto con el número",
          en: "Not found. Please check the ticket with the identification number"
        },
		"El boleto con número": 
		{
          es: "El boleto con número",
          en: "The ticket with the identification number"
        },
		"a sido confirmado": 
		{
          es: "a sido confirmado",
          en: "has been confirmed"
        },
		"se ha enviado el pase de abordar a su correo": 
		{
          es: "se ha enviado el pase de abordar a su correo",
          en: "the board pass has been sent to your mail"
        },
		"Contacte al servicio a clientes de AeroAlpes": 
		{
          es: "Contacte al servicio a clientes de AeroAlpes",
          en: "Please contact AeroAlpes customer service"
        },
		"Su correo": 
		{
          es: "Su correo",
          en: "Your e-mail"
        },
		"Lo sentimos, no hemos confirmar su boleto con el número": 
		{
          es: "Lo sentimos, no hemos confirmar su boleto con el número",
          en: "We're sorry, we couldn't confirm the ticket with the number"
        },
		"a sido confirmado": 
		{
          es: "a sido confirmado",
          en: "has been confirmed"
        },
		"revise su correo para confirmar!": 
		{
          es: "revise su correo para confirmar!",
          en: "check your mail to confirm"
        },
		"Reserve sus asientos": 
		{
          es: "Reserve sus asientos",
          en: "Reserve your seats"
        },
		"Frente": 
		{
          es: "Frente",
          en: "Front"
        },
		"Asientos": 
		{
          es: "Asientos",
          en: "Seats"
        },
		"Fecha de Nac.": 
		{
          es: "Fecha de Nac.",
          en: "Birth date"
        },
		"Continuar": 
		{
          es: "Continuar",
          en: "Continue"
        },
		"Ida": 
		{
          es: "Ida",
          en: "Departure"
        },
		"Regreso": 
		{
          es: "Regreso",
          en: "Comeback"
        },
		"Boleto normal": 
		{
          es: "Boleto normal",
          en: "Normal ticket"
        },
		"Boleto para niños": 
		{
          es: "Boleto para niños",
          en: "Kids ticket"
        },
		"Boleto para bebes": 
		{
          es: "Boleto para bebes",
          en: "Infant ticket"
        },
		"Elegir": 
		{
          es: "Elegir",
          en: "Select"
        },
		"No hay vuelos disponibles :(": 
		{
          es: "No hay vuelos disponibles :(",
          en: "There are no flights available :("
        },
		"Vuelo":
		{
			es: "Vuelo",
			en: "Flight"
		},
		"Pagado":
		{
			es: "Pagado",
			en: "Paid"
		},
		"Revise su tarjeta":
		{
			es: "Revise su tarjeta",
			en: "Check your card"
		}
      }
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
       
    var t = settings.t;
 
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
        
      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;



	this.getl = function(index, lang) {
      var res = index;

      try {
        res = t[index][lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };
	
	
	
	this.getlang = function() {
        return lang;
    };
	
	
    
    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    
    
		return this;
		
		

  };
})(jQuery);