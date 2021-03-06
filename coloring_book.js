window.addEventListener('load', eventWindowLoaded, false);
var undo_element = $('path[class="colorable"]')[0];
var undo_to_color = "white";	
var undo_stroke_color = "black";

function eventWindowLoaded() {
    alert("Else");
   get_svg_file();
   add_coloring_book_events();
}


function process_key_press

function get_svg_file()
{
    /*$.ajax({
        type: 'GET',
        url: 'BlackBlue5Row.svg',
        dataType: 'html',
        success: function (svg_resp, xmlstatus) {
            $('#coloring_book_image').append(svg_resp);
            add_coloring_book_events();
    },
    error: function (xhr, status, error) {
        alert("My Bad! " + error);
        }
    });*/
    
    $('#coloring_book_image').load('BlackBlue5Row.svg',function(response, status, xhr){
        if(status == "error"){
            var msg = "Sorry but there was an error: ";
            alert( msg + xhr.status + " " + xhr.statusText );
        }else {
            
            add_coloring_book_events();
        }
    });                                                                                                                                                 
}

function add_coloring_book_events() {
    

    
        
        
        // Add click events for colorable portions of drawing
        // Oddly, the selector $('path.colorable') does not work in iBooks reader, although it does in Mobile Safari
        $('.strokeable').bind("click", function(event) {
            
        // Suppress default; helpful on touchscreen devices
        event.preventDefault();
            
        // Get the current element and color and save it in undo_element and undo_to_color variables
        undo_element = this;
        undo_stroke_color = $(this).css('stroke');
            
        // Toggle the "Undo" button to make sure it says "Undo" (it might say "Redo")
        $('#undo_redo').attr("value", "Undo");
            
            if($('#fill_stroke').prop("checked")){
                // Set the fill of clicked portion of drawing to the color chosen in palette below
                color_chosen = $("#color_chosen").html();
                $(this).css('stroke',color_chosen);
            }
        });

        // Add click events for colorable portions of drawing
        // Oddly, the selector $('path.colorable') does not work in iBooks reader, although it does in Mobile Safari
        $('.colorable').bind("click", function(event) {
        // Suppress default; helpful on touchscreen devices
        event.preventDefault();

        // Get the current element and color and save it in undo_element and undo_to_color variables
        undo_element = this;
        undo_to_color = $(this).css('stroke');
        // Toggle the "Undo" button to make sure it says "Undo" (it might say "Redo")
        $('#undo_redo').attr("value", "Undo");
            
        if(!$('#fill_stroke').prop("checked")){
            // Set the fill of clicked portion of drawing to the color chosen in palette below
            color_chosen = $("#color_chosen").html();
            $(this).attr('style','fill:'+color_chosen);
        }
        });
    
    

    // Add click events for color palette
    $('.color_choice').bind("click", function(event) {
       // Get button id, which is the color name 
       color_chosen = $(this).attr("id");
       // Set color_chosen text to the name of color clicked
       $("#color_chosen").html(color_chosen); 
    });

    // Add click events for reset button, which reverts the fill of the entire drawing to white
    $('#reset_image').bind("click", function(event) {
	// Get all the colorable elements and set fill back to white
	$('path[class="colorable"]').attr("fill", "white");
	// Resetting the drawing clears all undo information
	$('#undo_redo').attr("value", "Undo");
	undo_element = $('path[class="colorable"]')[0];
	undo_to_color = "white";
    });

    $('#undo_redo').bind("click", function(event) {
	// First, save the existing color of the element we're going to undo
	existing_color = $(undo_element).attr("fill");
	// Now revert the color back to the undo_to_color
	$(undo_element).attr("fill", undo_to_color);
	// Finally, make existing_color the new undo_to_color, to support "Redo" functionality
	undo_to_color = existing_color;
	// If the button is named "Undo", rename it "Redo" and vice versa
	if ($(this).attr("value") == "Undo") {
	    $(this).attr("value", "Redo");
	} else {
	    $(this).attr("value", "Undo");
	}
    });
}