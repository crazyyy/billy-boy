var Captcha=Class.create();Captcha.prototype={initialize:function(e,t){this.url=e,this.formId=t},refresh:function(e){formId=this.formId,e&&Element.addClassName(e,"refreshing"),new Ajax.Request(this.url,{onSuccess:function(t){if(t.responseText.isJSON()){var r=t.responseText.evalJSON();!r.error&&r.imgSrc?($(formId).writeAttribute("src",r.imgSrc),e&&Element.removeClassName(e,"refreshing")):e&&Element.removeClassName(e,"refreshing")}},method:"post",parameters:{formId:this.formId}})}},document.observe("billing-request:completed",function(e){"undefined"!=typeof window.checkout&&("guest"==window.checkout.method&&$("guest_checkout")&&$("guest_checkout").captcha.refresh(),"register"==window.checkout.method&&$("register_during_checkout")&&$("register_during_checkout").captcha.refresh())}),document.observe("login:setMethod",function(e){var t=function(e,t){var r="captcha-input-box-",o="captcha-image-box-";$(r+t)&&($(r+t).hide(),$(o+t).hide()),$(r+e)&&($(r+e).show(),$(o+e).show())};switch(e.memo.method){case"guest":t("guest_checkout","register_during_checkout");break;case"register":t("register_during_checkout","guest_checkout")}});