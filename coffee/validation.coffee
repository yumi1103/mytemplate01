$ ->
  app.initialize()

window.app =
  initialize:->
    @setBind()
  
  setBind:->
    @is_error = false
    errorMessageClass = 'error'
    items = {
      name:$('input[name="name"]'),
      mail:$('input[name="mail"]'),
      tel:$('input[name="tel"]'),
      inquiry:$('textarea[name="inquiry"]')
    }

    $.each items, (index) ->
      items[index].prop 'isSuccess', false
    
    $('.conttact__btn--submit').on 'click', ->
      errorCount = 0
      itemsNum = items.length-1
      
      checkEmptyText items.name, '必須項目です'
      checkEmptyText items.mail, '必須項目です'
      checkEmptyText items.tel, '必須項目です'
      checkEmptyText items.inquiry, '必須項目です'
      
      for key,val of items
        console.log val
        if val.prop('isSuccess') == false
          errorCount++
      
      if errorCount == 0
        checkMail items.mail, '入力形式が異なります'
      else
        alert ('エラーがあります')
      
    checkEmptyText = (selector, message) ->
      if selector.val() == ''
        addErrorMessage(selector, message)
        selector.prop 'isSuccess', false
      else
        selector.prop 'isSuccess', true

    checkMail = (selector, message) ->
      checkVal = selector.val()
      if checkVal.match /^[A-Za-z0-9\w\.-]+@[\w\.-]+\.\w{2,}$/
        selector.prop 'isSuccess', true
        console.log 'test'
      else
        addErrorMessage(selector, message)
        selector.prop 'isSuccess', false
        console.log 'test2'

      
    addErrorMessage = (selector, message) ->
      removeErrorMessage(selector)
      selector.before '<span class="'+ errorMessageClass + '">' + message + '</span>'

    removeErrorMessage = (selector) ->
      messageSelector = selector.parent().find '.'+ errorMessageClass
      if messageSelector.length != 0
        messageSelector.remove()



  



  