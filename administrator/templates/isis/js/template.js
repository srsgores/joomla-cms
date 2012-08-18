function main()
{
	var animation_speed = "fast";
	datatables_init("table.table");
	$('*[rel=tooltip]').tooltip();
	$('*[rel=popover]').popover();

	// fix sub nav on scroll
	var $win = $(window)
		, $nav = $('.subhead')
		, navTop = $('.subhead').length && $('.subhead').offset().top - 40
		, isFixed = 0

	processScroll();

	// hack sad times - holdover until rewrite for 2.1
	$nav.on('click', function ()
	{
		if (!isFixed)
		{
			setTimeout(function ()
			{
				$win.scrollTop($win.scrollTop() - 47)
			}, 10)
		}

		$win.on('scroll', processScroll);

// Chosen select boxes
		$("select").chosen({
			disable_search_threshold:10,
			allow_single_deselect:true
		});

		// Turn radios into btn-group
		$('.radio.btn-group label').addClass('btn')
		$(".btn-group label:not(.active)").click(function ()
		{
			var label = $(this);
			var input = $('#' + label.attr('for'));

			if (!input.prop('checked'))
			{
				label.closest('.btn-group').find("label").removeClass('active btn-primary');
				label.addClass('active btn-primary');
				input.prop('checked', true);
			}
		});
		$(".btn-group input[checked=checked]").each(function ()
		{
			$("label[for=" + $(this).attr('id') + "]").addClass('active btn-primary');
		});
	}
	function datatables_init(selector)
	{
		$(selector).dataTable();
	}

	function processScroll()
	{
		var i, scrollTop = $win.scrollTop()
		if (scrollTop >= navTop && !isFixed)
		{
			isFixed = 1;
			$nav.addClass('subhead-fixed')
		}
		else if (scrollTop <= navTop && isFixed)
		{
			isFixed = 0;
			$nav.removeClass('subhead-fixed');
		}
	}

	jQuery(document).ready(function ($)
	{
		main();
	});

