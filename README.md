            setTimeout(function() {
                fly($("#bird"), height);
                clearTimeout(timeout)
                timeout = setTimeout(function() {
                    fall($("#bird"),height);
                })

            }, delay);