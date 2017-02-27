$(document).ready(function () {
    var select = new CustomSelect('custom-select-1', document.body);
    select.add("Title");
    select.add("Year");
    select.add("Ratingasddddddddddddddddd");
    select.add("Rating");
    select.add("Ratingasd");
    select.add("Ratingasdddddddddddddd");
    select.add("Ratingasd");
    select.add("Ratingasd");
    select.onChange(EventHandler);

    select.forEach(function (t) {
        t.Click(function () {
           location.href = "https://www.google.com";
        });
    });
});

function EventHandler() {
    alert("trigger");
}

var CustomSelect = function (pID, element) {
    var _id = pID;
    var _length = 0;
	
	this.getLength = function () { return _length; }
    this.setLength = function (value) { _length = value; }
    this.getId = function () { return _id; }
	
	
	if(typeof element !== 'undefined') {
		try{
			if(element instanceof HTMLElement) {
				$(element).append('<div class="custom-select" id="'+ _id + '"><div class="custom-select-name"><span class="name"></span><span class="sprit"></span></div><div class="custom-select-container"></div></div>');
			} else {
				throw new Exception("The element is not an HTMLElement...", this);
			} 
		} catch(e) {
			console.log(e);
			return;
		}
	}
	
	try{
		if(document.getElementById(_id) == null) {
			throw new Exception("This id does not exist...", this);
		}
	} catch(e) {
		console.log(e);
		return;
	}
	
    $('#' + _id + '> .custom-select-name').click(function () {
        $(this).next().toggle();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#' + _id + '> .custom-select-name').length) {
            $('#' + _id).children('.custom-select-container').hide();
            if ($('#' + _id).children('.custom-select-name').hasClass("active")) {
                $('#' + _id).children('.custom-select-name').removeClass("active");
            }
        }
    });
}

CustomSelect.prototype = (function (pID) {
    var _change = false;
    var _add = false;
    var _remove = false;

    function ElementClick(th, el) {
        var t = el;
        $('#' + th.getId()).children('.custom-select-container').children('.custom-select-element').each(function () {
            if (t != this) {
                $(this).removeClass("active");
            } else {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active");
                    $(this).parent().prev().children('.name').text($(this).find('span').html());
                    if (_change) {
                        FireEvent('selectOnChange');
                    }
                }
            }
            $(this).parent().hide();
            $(this).parent().prev().removeClass("active");
        });
    }

    function FireEvent(name) {
        var event = new CustomEvent(name, { 'detail': 'asdasdasdasdasd' });
        window.dispatchEvent(event);
    }

    return {
        add: function () {
            var t = this;
            var id = this.getId() + "-element" + this.getLength();
            $('#' + this.getId()).children('.custom-select-container').append("<div class='custom-select-element" + (this.getLength() == 0 ? " active" : "") + "' id='" + id + "' data-index='" + this.getLength() + "'><span>" + arguments[0] + "</span></div>");
            $('#' + id).click(function () { ElementClick(t, this); });
            Array.prototype.push.apply(this, [new CustomSelectElement(arguments[0], id)]);

            this.setLength(this.getLength() + 1);
            if (this.getLength() == 1) {
                $('#' + this.getId()).children('.custom-select-name').children('.name').text(arguments[0]);
            }

            if (_add) {
                FireEvent('selectOnAdd')
            }
        },
        remove: function (i) {
            $('#' + this.getId()).children('.custom-select-container').children('.custom-select-element').each(function (index) {
                if (index == i) {
                    delete this[i];
                    $(this).remove();

                    if (_remove) {
                        FireEvent('selectOnRemove')
                    }
                }
            });
        },
        forEach: function (func) {
            for (i = 0; i < this.getLength() ; i++) {
                if (typeof this[i] !== 'undefined') {
                    func(this[i]);
                }
            }
        },
        onChange: function (func) {
            _change = true;
            window.addEventListener("selectOnChange", func, false);
        },
        onAdd: function (func) {
            _add = true;
            window.addEventListener("selectOnAdd", func, false);
        },
        onRemove: function (func) {
            _remove = true;
            window.addEventListener("selectOnRemove", func, false);
        }
    }
})();

var CustomSelectElement = function (text, id) {
    this.Text = text;
    this.ID = id;
    this.Click = function (func) {
        $('#' + this.ID).click(function () {
            func();
        });
    }
}

var Exception = function(text, func) {
	this.Text = text;
	this.Function = func;
}

