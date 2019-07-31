(function() {
  $(function() {
    return app.initialize();
  });

  window.app = {
    initialize: function() {
      return this.setBind();
    },
    setBind: function() {
      var addErrorMessage, checkEmptyText, checkMail, errorMessageClass, items, removeErrorMessage;
      this.is_error = false;
      errorMessageClass = 'error';
      items = {
        name: $('input[name="name"]'),
        mail: $('input[name="mail"]'),
        tel: $('input[name="tel"]'),
        inquiry: $('textarea[name="inquiry"]')
      };
      $.each(items, function(index) {
        return items[index].prop('isSuccess', false);
      });
      $('.conttact__btn--submit').on('click', function() {
        var errorCount, itemsNum, key, val;
        errorCount = 0;
        itemsNum = items.length - 1;
        checkEmptyText(items.name, '必須項目です');
        checkEmptyText(items.mail, '必須項目です');
        checkEmptyText(items.tel, '必須項目です');
        checkEmptyText(items.inquiry, '必須項目です');
        for (key in items) {
          val = items[key];
          console.log(val);
          if (val.prop('isSuccess') === false) {
            errorCount++;
          }
        }
        if (errorCount === 0) {
          return checkMail(items.mail, '入力形式が異なります');
        } else {
          return alert('エラーがあります');
        }
      });
      checkEmptyText = function(selector, message) {
        if (selector.val() === '') {
          addErrorMessage(selector, message);
          return selector.prop('isSuccess', false);
        } else {
          return selector.prop('isSuccess', true);
        }
      };
      checkMail = function(selector, message) {
        var checkVal;
        checkVal = selector.val();
        if (checkVal.match(/^[A-Za-z0-9\w\.-]+@[\w\.-]+\.\w{2,}$/)) {
          selector.prop('isSuccess', true);
          return console.log('test');
        } else {
          addErrorMessage(selector, message);
          selector.prop('isSuccess', false);
          return console.log('test2');
        }
      };
      addErrorMessage = function(selector, message) {
        removeErrorMessage(selector);
        return selector.before('<span class="' + errorMessageClass + '">' + message + '</span>');
      };
      return removeErrorMessage = function(selector) {
        var messageSelector;
        messageSelector = selector.parent().find('.' + errorMessageClass);
        if (messageSelector.length !== 0) {
          return messageSelector.remove();
        }
      };
    }
  };

}).call(this);
