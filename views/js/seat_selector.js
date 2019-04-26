var firstSeatLabel= 1;

function initSeater(firstSeat, lastSeat, totalSeats, clase)
{
	alert(firstSeat + " " + lastSeat + " " + totalSeats + " " + clase);
	
	 $(document).ready(function() 
	 {
	    var $cart = $('#selected-seats'),
			$counter = $('#counter'),
			$total = $('#total'),
			sc = $('#seat-map').seatCharts({
			map: [
				'vv_vv',
				'vv_vv',
				'ee_ee',
				'ee_ee',
				'ee___',
				'ee_ee',
				'ee_ee',
				'ee_ee',
				'ttttt',
	      ],
	      seats: {
	        v: {
	          classes : 'first-class',
	          category: 'VIP'
	        },
			e: {
	          classes : 'second-class',
	          category: 'Ejecutivo'
	        },
	        t: {
	          classes : 'economy-class', //your custom CSS class
	          category: 'Turista'
	        }        
	      },
	      naming : 
		  {
	        top : false,
	        getLabel : function (character, row, column) 
			{

	          return firstSeatLabel++;
	        },
	      },
	      legend : {
	        node : $('#legend'),
	          items : [
	          [ 'v', 'Disponible',   'VIP' ],
	          [ 'e', 'Disponible',   'Ejecutivo'],
			  [ 't', 'Disponible',   'Turista'],
	          [ 'f', 'No disponible', 'Reservado']
	          ]    
	      },
	      click: function () 
		  {
	        if (this.status() == 'available') 
			{
	          //let's create a new <li> which we'll add to the cart items
	          $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
	            .attr('id', 'cart-item-'+this.settings.id)
	            .data('seatId', this.settings.id)
	            .appendTo($cart);

	          $counter.text(sc.find('selected').length+1);

	          $total.text(recalculateTotal(sc)+this.data().price);

	          return 'selected';

	        } 
			else if (this.status() == 'selected') 
			{
	          //update the counter
	          $counter.text(sc.find('selected').length-1);

	          $total.text(recalculateTotal(sc)-this.data().price);

	          //remove the item from our cart
	          $('#cart-item-'+this.settings.id).remove();

	          //seat has been vacated
	          return 'available';
	        } 
			else if (this.status() == 'unavailable') 
			{
	          //seat has been already booked
	          return 'unavailable';
			} 
			else 
			{
	          return this.style();
	        }
	      }

	    });

	    //this will handle "[cancel]" link clicks
	    $('#selected-seats').on('click', '.cancel-cart-item', function () {

	      //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here

	      sc.get($(this).parents('li:first').data('seatId')).click();
	    });

	    //let's pretend some seats have already been booked
	    sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
	});
}

	function recalculateTotal(sc) 
	{

	  var total = 0;

	  //basically find every selected seat and sum its price
	  sc.find('selected').each(function () 
	  {
	    total += this.data().price;
	  });
	  return total;
	}