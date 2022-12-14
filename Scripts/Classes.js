class Obj {
  frame = 1
  timer = 0
  pescado = false
  coletado = false
  score = 0
  animacaoDano = 3
  explodindo = false

  tiposPossiveisObjeto = ['Peixes', 'Lixos', 'Inimigos', 'Minhocas']
  peixesPossiveis = ['Salmao', 'Tilapia', 'Pacu']
  lixosPossiveis = ['Bota']
  inimigosPossiveis = ['Tubarao', 'Caranguejo']
  minhocasPossiveis = ['Lata']

  constructor(x, y, width, height, velocidade, image) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocidade = velocidade
    this.image = image
  }
  desenha() {
    var img = new Image()
    img.src = this.image
    pincel.drawImage(img, this.x, this.y, this.width, this.height)
  }

  animation(name) {
    this.timer += 1
    if (this.timer > 10) {
      this.timer = 0
      this.frame += 1
    }
    if (this.frame > 4) {
      this.frame = 1
    }
    this.image = 'Assets/' + name + this.frame + '.png'
  }

  movement() {
    this.x += this.velocidade
  }

  peixePescado(x, y, imagemPescado) {
    var img = new Image()
    img.src = imagemPescado
    pincel.drawImage(img, x, y + 20, this.height, this.width)
  }

  sofreuDano() {
    var img = new Image()
    img.src = 'Assets/dano.png'
    if(player.animacaoDano > 0){
      pincel.drawImage(img, this.x, this.y, this.width, this.height)
    }
  }
}

class Img {
  constructor(x, y, width, height, image) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
  }
  desenha() {
    var img = new Image()
    img.src = this.image
    pincel.drawImage(img, this.x, this.y, this.width, this.height)
  }
}

class Button extends Img {

  clickButton(x, y) {
    if (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    ) {
      return true
    }
  }

  desenha() {
    var img = new Image()
    img.src = this.image
    pincel.drawImage(img, this.x, this.y, this.width, this.height)
  }
}

class Player extends Obj {
  peixesPescados = 0
  timer = 300
  iscas = 3
  tempoTubarao = 0

  ret = ''

  fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600)
    var mins = ~~((duration % 3600) / 60)
    var secs = ~~duration % 60

    this.ret = ''

    // Output like "1:01" or "4:03:59" or "123:03:59"

    if (hrs > 0) {
      this.ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }

    this.ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    this.ret += '' + secs
  }

  getTimer() {
    this.fancyTimeFormat(this.timer)
    return this.ret
  }
}

class LinhaVaraPesca extends Obj {
  velocidade = 1

  collide(obj) {
    if (
      this.x < obj.x + obj.width &&
      this.x + obj.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + obj.height > obj.y
    ) {
      return true
    } else {
      return false
    }
  }

  mudaTamanho(aumenta) {
    if (aumenta) {
      if (this.height >= 150) {
        this.height -= 10 * this.velocidade
        this.y += 1
      }
    } else {
      if (this.height <= 700) {
        this.height += 10 * this.velocidade

        this.y -= 1
      }
    }
  }
}

class Isca extends Obj {
  // image = "Assets/minhoca.png"

  collide(obj) {
    if (
      this.x < obj.x + obj.width &&
      this.x + obj.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + obj.height > obj.y
    ) {
      return true
    } else {
      return false
    }
  }
}

class Salmao extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[0]
  objetoNome = this.peixesPossiveis[0]
  score = 5

  imgPescado = 'Assets/salmaoPescado.png'
}

class Tilapia extends Obj {
  speed = 30
  tipoObj = this.tiposPossiveisObjeto[0]
  objetoNome = this.peixesPossiveis[1]
  score = 1

  imgPescado = 'Assets/tilapiaPescado.png'
}

class Pacu extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[0]
  objetoNome = this.peixesPossiveis[2]
  score = 3

  imgPescado = 'Assets/pacuPescado.png'
}

class Bota extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[1]
  objetoNome = this.lixosPossiveis[0]

  imgPescado = 'Assets/bota.png'
}

class Tubarao extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[2]
  objetoNome = this.inimigosPossiveis[0]
}

class Caranguejo extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[2]
  objetoNome = this.inimigosPossiveis[1]
}

class lataMinhoca extends Obj {
  speed = 40
  tipoObj = this.tiposPossiveisObjeto[3]
  objetoNome = this.minhocasPossiveis[0]

  imgPescado = 'Assets/lataMinhoca.png'
}

class invocarPeixe {
  generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  peixesVivos = []
  larguraInicial = -600
  alturaInicial = this.generateRandomIntegerInRange(300, 670)
  peixeMomento

  //Variavel
  tubarao = false

  gerarPeixe() {
    //Posi????o inicial do peixe
    this.larguraInicial = -600
    this.alturaInicial = this.generateRandomIntegerInRange(300, 670)

    var qualPeixe = this.generateRandomIntegerInRange(0, 3)
    this.peixeMomento = this.instanciaPeixe(qualPeixe)
    this.peixesVivos.push(this.peixeMomento)

    //COM INIMIGO
    if (this.generateRandomIntegerInRange(0, 1) == 1) {
      //Atras
      if (this.generateRandomIntegerInRange(0, 1) == 0) {
        this.larguraInicial -= 230
      } else {
        this.larguraInicial += 230
      }
      var qualInimigo = this.generateRandomIntegerInRange(4, 6)
      this.peixeMomento = this.instanciaPeixe(qualInimigo)
      this.peixesVivos.push(this.peixeMomento)
    }
  }

  instanciaPeixe(index) {
    switch (index) {
      case 0:
        return new Salmao(
          this.larguraInicial,
          this.alturaInicial,
          142,
          50,
          3,
          'Assets/salmao.png',
        )
      case 1:
        return new Pacu(
          this.larguraInicial,
          this.alturaInicial,
          142,
          50,
          3,
          'Assets/pacu.png',
        )
      case 2:
        return new Tilapia(
          this.larguraInicial,
          this.alturaInicial,
          142,
          50,
          3,
          'Assets/tilapia.png',
        )
      case 3:
        return new lataMinhoca(
          this.larguraInicial,
          this.alturaInicial,
          50,
          99,
          3,
          'Assets/lataMinhoca.png',
        )
      case 4:
        return new Caranguejo(
          this.larguraInicial,
          260,
          129,
          50,
          1,
          'Assets/caranguejo.png',
        )
      case 5:
        return new Bota(
          this.larguraInicial,
          this.alturaInicial,
          75,
          81,
          3,
          'Assets/bota.png',
        )
      case 6:
        return new Tubarao(
          this.larguraInicial,
          this.alturaInicial,
          201,
          90,
          3,
          'Assets/tubarao.png',
        )
    }
  }

  peixeFuncao() {
    // Para manipular cada peixe no array que foi preenchido pela fun????o invocarPeixe.
    this.peixesVivos.forEach((peixin) => {
      if(peixin.explodindo){
        console.log("explodindo")
        if(player.animacaoDano >= 0){
          peixin.sofreuDano()
          console.log("animacao")
        }else{
          peixin.explodindo = false
          peixin.x = 30000
          console.log("parou de explodir!")
        }
        return
      }
      // console.log(peixin)
      // Verfica se o peixe j?? foi coletado ou n??o. Caso n??o ele desenhar?? e chamar?? a fun????o movimenta????o dos peixes que ainda n??o foram coletados, escolhi assim pois n??o achei como destroir um objeto depois de ser pego, ent??o os que forem pegos ir??o passar por esse if e n??o ser??o desenhados e nem se movimentaram
      if (!peixin.coletado) {
        // Caso o peixe ainda n??o tenha sido fisgado ele entrar?? nesse if, que o desenhar??, movimentar??, e ter?? o collider caso encoste na isca.
        if (peixin.pescado == false) {
          peixin.desenha()
          peixin.movement()

          // Caso a isca colida com o peixe ele verificar?? se a isca j?? n??o est?? segurando um peixe, caso n??o ele entrar?? num switch para definir qual peixe foi pescado
          if (iscaObj.collide(peixin)) {
            if (!iscaObj.pescado) {
              iscandoPeixe.play()
              switch (peixin.objetoNome) {
                case 'Pacu':
                  iscaObj.pescado = true
                  peixin.pescado = true
                  console.log('Coletou Pacu')
                  break
                case 'Salmao':
                  iscaObj.pescado = true
                  peixin.pescado = true
                  console.log('Coletou Salmao')
                  break
                case 'Tilapia':
                  iscaObj.pescado = true
                  peixin.pescado = true
                  console.log('Coletou Tilapia')
                  break
                case 'Bota':
                  iscaObj.pescado = true
                  peixin.pescado = true
                  console.log('Pegou bota')
                  break
                case 'Tubarao':
                  if (player.tempoTubarao <= 0) {
                    player.tempoTubarao = 3
                    iscaObj.pescado = false
                    player.iscas -= 1
                    linha.height = 150
                    linha.y = 10
                    tubaraoSound.play()
                    console.log('Tubarao comeu isca')
                    peixin.explodindo = true
                    player.animacaoDano = 3
                  }
                  console.log('Tubarao comeu isca')
                  break
                case 'Lata':
                  iscaObj.pescado = true
                  peixin.pescado = true
                  console.log('Pegou lata de minhocas')
              }
            }

            // Caso ele tenha fisgado um peixe j??, por??m encostar num tubar??o ele perder?? o peixe e a isca
            else {
              if (peixin.objetoNome == 'Tubarao') {
                if (player.tempoTubarao <= 0) {
                  player.tempoTubarao = 3
                  iscaObj.pescado = false
                  player.iscas -= 1
                  linha.height = 150
                  linha.y = 10
                  tubaraoSound.play()
                  console.log('Tubarao comeu isca')
                  peixin.explodindo = true
                  player.animacaoDano = 3
                }
              }
            }
          }
        }

        //Caso o peixe esteja fisgado. Ele ir?? arrumar o x dependendo do objeto.
        else {
          if (peixin.objetoNome == 'Lata') peixin.height = 60
          if (peixin.objetoNome == 'Bota')
            peixin.peixePescado(iscaObj.x - 25, iscaObj.y, peixin.imgPescado)
          else peixin.peixePescado(iscaObj.x, iscaObj.y, peixin.imgPescado)

          // Caso a linha chegue na altura 150 quando tem um peixe fisgado ela entrar?? nesse if, que verificar?? qual objeto que foi coletado e tratar??.
          if (linha.height <= 150) {
            if (peixin.objetoNome == 'Bota') {
              player.iscas -= 1
              iscaObj.pescado = false
            }
            if (peixin.objetoNome == 'Lata') {
              player.iscas += 1
              iscaObj.pescado = false
              peixin.coletado = true
            } else {
              player.peixesPescados += 1
              peixin.coletado = true
              player.score += peixin.score
              iscaObj.pescado = false
              peixeColetado.play()
            }
          }
          if(linha.height >= 600){
            linha.height = 600
          }
        }
      }

      if (peixin.objetoNome == 'Caranguejo') {
        if (linha.height > 255 && peixin.x == 550) {
          if (player.tempoTubarao <= 0) {
            player.tempoTubarao = 3
            player.iscas -= 1
            linha.height = 150
            linha.y = 10
            iscaObj.pescado = false
            caranguejoSound.play()
            console.log('caranguejo comeu isca')
            peixin.explodindo = true
            player.animacaoDano = 3
          }
        }
      }

    })
  }
}
