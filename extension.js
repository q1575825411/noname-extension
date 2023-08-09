game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "1", content: function (config, pack) {

        }, precontent: function () {

        }, help: {}, config: {}, package: {
            character: {
                character: {
                    "2": ["male", "jin", 3, ["sbzz_qishi"], ["des:2"]],
                    "苍穹1号": ["female", "jin", 4, ["shuzixilie"], ["des:苍穹系列第一位角色"]],
                },
                translate: {
                    "2": "2",
                    "苍穹1号": "苍穹1号",
                },
            },
            card: {
                card: {
                },
                translate: {
                },
                list: [],
            },
            skill: {
                skill: {
                    shuzixilie: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        frequent: true,
                        content: function () {
                            var hp = player.hp;
                            var handcards = player.countCards('h');

                            if (hp == handcards) {
                                player.addSkill('guipai');
                            } else {
                                player.draw(Math.abs(hp - handcards) + 1);
                            }
                        },
                    },
                    guipai: {
                        trigger: {
                            player: "useCard",
                        },
                        frequent: true,
                        content: function () {
                            var card = trigger.card.name;
                            card = game.createCard(card);
                            card._destroy = true;
                            player.gain(card);
                            player.removeSkill('guipai');
                        },
                        ai: {
                            threaten: 1.4,
                            noautowuxie: true,
                        },
                    },
                    "sbzz_qishi": {
                        trigger: {
                            player: ["phaseBegin", "phaseEnd"],
                        },
                        frequent: true,
                        priority: -1,
                        content: function () {
                            "step 0"
                            event.cards = get.cards(5);
                            if (event.isMine() == false) {
                                event.dialog = ui.create.dialog('启示', event.cards);
                                game.delay(2);
                            }
                            "step 1"
                            if (event.dialog) event.dialog.close();
                            var dialog = ui.create.dialog('启示', event.cards);
                            player.chooseButton([0, 5], dialog, true).set('ai', function (button) {
                                return get.value(button.link);
                            }).filterButton = function (button) {
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    if (get.type(button.link) == get.type(ui.selected.buttons[i].link)) return false;
                                }
                                return true;
                            }
                            "step 2"
                            var cards2 = [];
                            for (var i = 0; i < result.buttons.length; i++) {
                                cards2.push(result.buttons[i].link);
                                cards.remove(result.buttons[i].link);
                            }
                            player.gain(cards2, 'log');
                            if (cards2.length) player.$gain2(cards2);
                            for (var i = 0; i < cards.length; i++) {
                                cards[i].discard();
                            }
                            game.delay(2);
                        },
                        ai: {
                            threaten: 2,
                        },
                    },
                },
                translate: {
                    shuzixilie: "先驱",
                    "shuzixilie_info": "回合开始阶段，若你的手牌数量和体力不相等，你摸x张牌（x为你手牌与体力值的差 + 1）；若相等，你获得技能【鬼谋】",
                    guipai: "鬼谋",
                    "guipai_info": "获得你使用的下一张牌的复制。",
                    "sbzz_qishi": "启示",
                    "sbzz_qishi_info": "回合开始阶段、回合结束阶段你可以展示牌堆顶的x张牌，然后获得其中基本牌、普通锦囊牌、延迟类锦囊牌、装备牌各一张，将其余牌置入弃牌堆（x为你手牌与体力值的和）",
                },
            },
            intro: "",
            author: "无名玩家",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": ["苍穹1号.jpg", "2.jpg"], "card": [], "skill": [] }
    }
})