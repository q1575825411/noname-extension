game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "1", content: function (config, pack) {

        }, precontent: function () {

        }, help: {}, config: {}, package: {
            character: {
                character: {
                    "1": ["female", "jin", 4, ["shuzixilie"], ["des:1"]],
                },
                translate: {
                    "1": "1",
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
                },
                translate: {
                    shuzixilie: "先驱",
                    "shuzixilie_info": "回合开始阶段，若你的手牌数量和体力不相等，你摸x张牌（x为你手牌与体力值的差 + 1）；若相等，你获得技能【鬼谋】",
                    guipai: "鬼谋",
                    "guipai_info": "获得你使用的下一张牌的复制。",
                },
            },
            intro: "",
            author: "无名玩家",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": ["1.jpg"], "card": [], "skill": [] }
    }
})