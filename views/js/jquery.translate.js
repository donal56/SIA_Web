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
          en: "User",
		  fr: "Utilisateur"
        },
		"Iniciar sesión": 
		{
          es: "Iniciar sesión",
          en: "Log in",
		  fr: "Commencer la session"
        },
		"Correo electrónico": 
		{
          es: "Correo electrónico",
          en: "E-mail",
		  fr: "Courrier électronique"
        },
		"Contraseña": 
		{
          es: "Contraseña",
          en: "Password",
		  fr: "Mot de passe"
        },
		"La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.": 
		{
          es: "La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.",
          en: "The password must contain at least 8 characters, including uppercase letters, lowercase letters and numbers.",
		  fr: "Le mot de passe doit contenir au moins 8 caractères, y compris les majuscules, les minuscules et les chiffres."
        },
		"Crear una cuenta nueva": 
		{
          es: "Crear una cuenta nueva",
          en: "Create a new account",
		  fr: "Créer un nouveau compte"
        },
		"Registrarse": 
		{
          es: "Registrarse",
          en: "Sign up",
		  fr: "S'inscrire"
        },
		"¿Olvidaste tu contraseña?": 
		{
          es: "¿Olvidaste tu contraseña?",
          en: "Forgot password?",
		  fr: "Vous avez oublié votre mot de passe?"
        },
		"¡Bienvenido!": 
		{
          es: "¡Bienvenido!",
          en: "Welcome!",
		  fr: "Bienvenue!"
        },
		"Inicio de sesión exitoso": 
		{
          es: "Inicio de sesión exitoso",
          en: "Succesful log in;",
		  fr: "Début de session réussie"
        },
		"Correo y/o contraseña incorrectos": 
		{
          es: "Correo y/o contraseña incorrectos",
          en: "Wrong e-mail and/or password",
		  fr: "Email et / ou mot de passe incorrect"
        },
		"Error":
		{
			es: "Error",
			en: "Error",
			fr: "Erreur"
		},
		"Sesión cerrada": 
		{
          es: "Sesión cerrada",
          en: "Session closed",
		  fr: ""
        },
		"Error al cerrar sesión": 
		{
          es: "Error al cerrar sesión",
          en: "Error login out",
		  fr: "Session fermée"
        },
		"¡Gracias por Registrarte!": 
		{
          es: "¡Gracias por Registrarte!",
          en: "Thanks for signing up!",
		  fr: "Merci de vous être inscrit!"
        },
		"Mensaje enviado": 
		{
          es: "Mensaje enviado",
          en: "E-mail sent",
		  fr: "Message envoyé"
        },
		"Sencillo": 
		{
          es: "Sencillo",
          en: "One way",
		  fr: "Aller Simple"
        },
		"Redondo": 
		{
          es: "Redondo",
          en: "Round trip",
		  fr: "Aller retour"
        },
		"Tipo": 
		{
          es: "Tipo",
          en: "Type",
		  fr: "Type"
        },
		"Origen": 
		{
          es: "Origen",
          en: "Origin",
		  fr: "Origine"
        },
		"Destino": 
		{
          es: "Destino",
          en: "Destination",
		  fr: "Destination"
        },
		"Pasajeros": 
		{
          es: "Pasajeros",
          en: "Passengers",
		  fr: "Passagers"
        },
		"¡Descubre!": 
		{
          es: "¡Descubre!",
          en: "¡Discover!",
		  fr: "Découvrez!"
        },
		"Nuestras disculpas. No puede llevar bebes en clase VIP.":
		{
			es: "Nuestras disculpas. No puede llevar bebes en clase VIP.",
			en: "Our apologies. You can't bring babies in the VIP class.",
			fr: "Nos excuses Vous ne pouvez pas amener des bébés en classe premiere"
		},
		"pasajero(s)": 
		{
          es: "pasajero(s)",
          en: "passenger(s)",
		  fr: "passager(s)"
        },
		"Adultos": 
		{
          es: "Adultos",
          en: "Adults",
		  fr: "Adultes"
        },
		"Menores": 
		{
          es: "Menores",
          en: "Minors",
		  fr: "Enfants"
        },
		"Bebes": 
		{
          es: "Bebes",
          en: "Infants",
		  fr: "Bébés"
        },
		"Clase": 
		{
          es: "Clase",
          en: "Class",
		  fr: "Classe"
        },
		"VIP": 
		{
          es: "VIP",
          en: "VIP",
		  fr: "Premiere"
        },
		"Ejecutivo": 
		{
          es: "Ejecutivo",
          en: "Executive",
		  fr: "Exécutif"
        },
		"Turista": 
		{
          es: "Turista",
          en: "Economy class",
		  fr: "Touriste"
        },
		"Fecha de Salida": 
		{
          es: "Fecha de Salida",
          en: "Departing date",
		  fr: "Date de sortie"
        },
		"Fecha de Regreso": 
		{
          es: "Fecha de Regreso",
          en: "Return date",
		  fr: "Date de retour"
        },
		"Buscar Vuelos": 
		{
          es: "Buscar Vuelos",
          en: "Search flights",
		  fr: "Rechercher des vols"
        },
		"Col. Nueva Villahermosa": 
		{
          es: "Col. Nueva Villahermosa",
          en: "Suburb Nueva Villahermosa",
		  fr: "Banlieue Nueva Villahermosa"
        },
		"Calle Progreso #120 Piso 7": 
		{
          es: "Calle Progreso #120 Piso 7",
          en: "Progreso street #120 7th floor",
		  fr: "Rue Progreso #120 7éme étage"
        },
		"Contacto (993) 297 82 61": 
		{
          es: "Contacto (993) 297 82 61",
          en: "Contact us (993) 297 82 61",
		  fr: "Contact (993) 297 82 61"
        },
		"Por favor, ingrese todos los datos": 
		{
          es: "Por favor, ingrese todos los datos",
          en: "Please fill all the data.",
		  fr: "S'il vous plaît, entrez toutes les données"
        },
		"Asiento": 
		{
          es: "Asiento",
          en: "Seat",
		  fr: "Siège"
        },
		"Check-in": 
		{
          es: "Check-in",
          en: "Check-in",
		  fr: "Check-in"
        },
		"Ingrese sus datos": 
		{
          es: "Ingrese sus datos",
          en: "Fill with your data",
		  fr: "Entrez vos données"
        },
		"Número de boleto": 
		{
          es: "Número de boleto",
          en: "Ticket number",
		  fr: "Numéro de billet"
        },
		"Continuar": 
		{
          es: "Continuar",
          en: "Continue",
		  fr: "Continuer"
        },
		"Consigue tu pase de abordar electronico para ahorrar tiempo": 
		{
          es: "Consigue tu pase de abordar electronico para ahorrar tiempo",
          en: "Get your electronic pass board to save time",
		  fr: "Obtenez votre carte d'embarquement électronique pour gagner du temps"
        },
		"Confirmado": 
		{
          es: "Confirmado",
          en: "Confirmed",
		  fr: "Confirmé"
        },
		"Gracias por su preferencia": 
		{
          es: "Gracias por su preferencia",
          en: "Thanks for your preference",
		  fr: "Merci pour votre choix"
        },
		"Hemos adjuntado a este correo su pase de abordar": 
		{
          es: "Hemos adjuntado a este correo su pase de abordar",
          en: "We have attached your pass board in this mail",
		  fr: "Nous avons joint votre carte d'embarquement à cet email."
        },
		"recuerda": 
		{
          es: "recuerda",
          en: "remember",
		  fr: "souvenir"
        },
		"imprimir y tener a la mano su pase para poder abordar su vuelo": 
		{
          es: "imprimir y tener a la mano su pase para poder abordar su vuelo",
          en: "to print and bring your pass so you can board your flight",
		  fr: "imprimez et ayez votre passe sous la main pour pouvoir embarquer sur votre vol"
        },
		"Aeroalpes ®  - Grupo Alpes": 
		{
          es: "Aeroalpes ®  - Grupo Alpes",
          en: "Aeroalpes ®  - Alpes Group",
		  fr: "Aeroalpes ®  - Alpes Groupe"
        },
		"Registrado": 
		{
          es: "Registrado",
          en: "Logged in",
		  fr: "Enregistré"
        },
		"¡Bienvenido a Aeroalpes!": 
		{
          es: "¡Bienvenido a Aeroalpes!",
          en: "Welcome to Aeroalpes!",
		  fr: "Bienvenue chez Aeroalpes!"
        },
		"gracias por registrarte": 
		{
          es: "gracias por registrarte",
          en: "thanks for signing up",
		  fr: "merci de vous inscrire"
        },
		"ahora tienes acceso a muchos de nuestros servicios": 
		{
          es: "ahora tienes acceso a muchos de nuestros servicios",
          en: "now you have access to many of our services",
		  fr: "vous avez maintenant accès à plusieurs de nos services"
        },
		"¡Buen viaje!": 
		{
          es: "¡Buen viaje!",
          en: "Good trip!",
		  fr: "Bon voyage!"
        },
		"Vuelos": 
		{
          es: "Vuelos",
          en: "Flights",
		  fr: "Vols"
        },
		"Nombre": 
		{
          es: "Nombre",
          en: "First name",
		  fr: "Nom"
        },
		"Apellidos": 
		{
          es: "Apellidos",
          en: "Last name",
		  fr: "Nom de famille"
		},
		"Número de tarjeta": 
		{
          es: "Número de tarjeta",
          en: "Card number",
		  fr: "Numéro de carte"
        },
		"Expiración": 
		{
          es: "Expiración",
          en: "Expiration",
		  fr: "Expiration"
        },
		"CVV": 
		{
          es: "CVV",
          en: "CVV",
		  fr: "CVV"
        },
		"Pagar": 
		{
          es: "Pagar",
          en: "Pay",
		  fr: "Payer"
        },
		"Seleccione el vuelo que desee para cada trayecto": 
		{
          es: "Seleccione el vuelo que desee para cada trayecto",
          en: "Select the flight you´ll attend for each trip",
		  fr: "Sélectionnez le vol que vous voulez pour chaque voyage"
        },
		"!Imprime tu pase de abordar!": 
		{
          es: "!Imprime tu pase de abordar!",
          en: "!Print your board pass!",
		  fr: "Imprimez votre carte d'embarquement!"
        },
		"Presione para confirmar su boleto con el número": 
		{
          es: "Presione para confirmar su boleto con el número",
          en: "Press to confirm your ticket with the identification number",
		  fr: "Appuyez sur pour confirmer votre billet avec le numéro"
        },
		"Se enviará el pase de abordar a su correo": 
		{
          es: "Se enviará el pase de abordar a su correo",
          en: "The pass board will be sent to your mail",
		  fr: "La carte d'embarquement sera envoyée à votre adresse email"
        },
		"No se encontro el boleto con el número": 
		{
          es: "No se encontro el boleto con el número",
          en: "Not found. Please check the ticket with the identification number",
		  fr: "Le billet avec le numéro n'a pas été trouvé"
        },
		"El boleto con número": 
		{
          es: "El boleto con número",
          en: "The ticket with the identification number",
		  fr: "Le billet avec le numéro"
        },
		"a sido confirmado": 
		{
          es: "a sido confirmado",
          en: "has been confirmed",
		  fr: "a été confirmé"
        },
		"se ha enviado el pase de abordar a su correo": 
		{
          es: "se ha enviado el pase de abordar a su correo",
          en: "the board pass has been sent to your mail",
		  fr: "la carte d'embarquement a été envoyée à votre courrier"
        },
		"Contacte al servicio a clientes de AeroAlpes": 
		{
          es: "Contacte al servicio a clientes de AeroAlpes",
          en: "Please contact AeroAlpes customer service",
		  fr: "Contacter le service clients AeroAlpes"
        },
		"Su correo": 
		{
          es: "Su correo",
          en: "Your e-mail",
		  fr: "Votre mail"
        },
		"Lo sentimos, no hemos confirmar su boleto con el número": 
		{
          es: "Lo sentimos, no hemos confirmar su boleto con el número",
          en: "We're sorry, we couldn't confirm the ticket with the number",
		  fr: "Désolé, nous n'avons pas confirmé votre billet avec le numéro"
        },
		"a sido confirmado": 
		{
          es: "a sido confirmado",
          en: "has been confirmed",
		  fr: "a été confirmé"
        },
		"revise su correo para confirmar!": 
		{
          es: "revise su correo para confirmar!",
          en: "check your mail to confirm",
		  fr: "vérifiez votre courrier pour confirmer!"
        },
		"Reserve sus asientos": 
		{
          es: "Reserve sus asientos",
          en: "Reserve your seats",
		  fr: "Réservez vos places"
        },
		"Frente": 
		{
          es: "Frente",
          en: "Front",
		  fr: "De face"
        },
		"Asientos": 
		{
          es: "Asientos",
          en: "Seats",
		  fr: "Places"
        },
		"Fecha de Nac.": 
		{
          es: "Fecha de Nac.",
          en: "Birth date",
		  fr: "Cate de naissance"
        },
		"Continuar": 
		{
          es: "Continuar",
          en: "Continue",
		  fr: "Continuer"
        },
		"Ida": 
		{
          es: "Ida",
          en: "Departure",
		  fr: "Départ"
        },
		"Regreso": 
		{
          es: "Regreso",
          en: "Comeback",
		  fr: "Reviens"
        },
		"Boleto normal": 
		{
          es: "Boleto normal",
          en: "Normal ticket",
		  fr: "Billet normal"
        },
		"Boleto para niños": 
		{
          es: "Boleto para niños",
          en: "Kids ticket",
		  fr: "Billet pour enfants"
        },
		"Boleto para bebes": 
		{
          es: "Boleto para bebes",
          en: "Infant ticket",
		  fr: "Billet bébé"
        },
		"Elegir": 
		{
          es: "Elegir",
          en: "Select",
		  fr: "Sélectionner"
        },
		"No hay vuelos disponibles :(": 
		{
          es: "No hay vuelos disponibles :(",
          en: "There are no flights available :(",
		  fr: "Il n'y a pas de vols disponibles :("
        },
		"Vuelo":
		{
			es: "Vuelo",
			en: "Flight",
			fr: "Vol"
		},
		"Pagado":
		{
			es: "Pagado",
			en: "Paid",
			fr: "Payé"
		},
		"Revise su tarjeta":
		{
			es: "Revise su tarjeta",
			en: "Check your card",
			fr: "Vérifiez votre carte"
		},
		"Reservado":
		{
			es: "Reservado",
			en: "Booked",
			fr: "Réservé"
		},
		"Por favor, revise que los datos sean correctos":
		{
			es: "Por favor, revise que los datos sean correctos",
			en: "Please check all the information is correct",
			fr: ""
			
		},
		"Revise que haya elegido asientos disponibles y que las fechas de nacimiento sean correctas a la categoría de edad":
		{
			es: "Revise que haya elegido asientos disponibles y que las fechas de nacimiento sean correctas a la categoría de edad",
			en: "Confirm you selected seats that are available and birthdates according to the age category",
			fr: "S'il vous plaît, vérifiez que les données sont correctes"
		},
		"Precio":
		{
			es: "Precio",
			en: "Price",
			fr: "Prix"
		},
		"Recuperar Contraseña":
		{
			es: "Recuperar Contraseña",
			en: "Recover password",
			fr: "Récupérer le mot de passe"
		},
		"Una nueva contraseña sera enviada a tu correro electrónico":
		{
			es: "Una nueva contraseña sera enviada a tu correro electrónico",
			en: "A new password will be sent to your e-mail",
			fr: "Un nouveau mot de passe sera envoyé à votre email"
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



	this.getl = function(index) {
      var res = index;

      try {
        res = t[index]["es"];
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