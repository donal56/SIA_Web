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
        "Usuario&nbsp;": 
		{
          es: "Usuario&nbsp;",
          en: "User&nbsp;"
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
		"Error..":
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