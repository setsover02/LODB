# index

## Basic List

| Name | Desc |
| :--- | :--- |
| ID | 도감번호 |
| Team |  |
| Name | 이름 |
| Rarity | \[ SS, S, A, B \] 등급에 따라 패시브스킬 활성/비활성 |
| Type | \[경, 중, 기\] |
| Role | \[공, 보, 지\] |
| Level |  |
| Damage | \(공격력\)레벨업 시 상승, 강화, 링크보너스, 아이템, 버프 |
| Crit | \(치명\)강화, 링크보너스, 풀링보너스, 아이템, 버프 |
| Hit | \(적중\)강화, 링크보너스, 풀링보너스, 아이템, 버프 |
| Health | \(체력\)레벨업 시 상승, 강화, 링크보너스, 아이템 |
| Defense | \(방어력\)레벨업 시 상승, 강화, 링크보너스, 아이템, 버 |
| Dodge | \(회피\)강화, 링크보너스, 풀링보너스, 아이템, 버 |
| AP | \(행동력\)링크보너스, 풀링보너스, 아이템, 버 |
| Pen | \(방관\)아이템, 버 |
| Reduce | \(피해감소\)아이템, 버 |
| LinkBonus | 1링크 시 증가하는 스탯 나열 |
| Link | 링크 퍼센티 |
| FullLink | 풀 링크 보너스 리스트 및 증가 수치 |

## Skill

| Name | Desc |
| :--- | :--- |
| SkillName | 스킬이름 |
| SkillComment | 스킬설명 |
| SkillLevel | 스킬레 |
| SkillCoef | 스킬 레벨 1당 증가 수 |
| SkillCoef | 버프스킬이 아닌 스킬 데미지 계수 |

## Suffix

| Suffix | Desc |
| :--- | :--- |
| base | 1레벨 기본 수 |
| coef | 1레벨업 시 스탯 증가 |
| ehn | 강화 포인트 \(입력\) Level \* 3 최대값 |
| ehnCoef | 강화 포인트 1당 증가 수치 |
| itemCoef | 아이템으로 증가하는 수치 |
| linkCoef | 1링크 시 증가하는 수 |
| buffCoef | 기타 버프로 증가하는 수치 |

데미지 계산식

```text
// 1레벨 데미지 + (레벨업 증가 데미지 * (레벨 - 1)) = D
DamageBase + (DamageCoef * (Level- 1)) = D

// D + (데미지 강화 수치 * 강화1당 증가수치) = DEnh
D + (DamageEhn * DamageEnhCoef) = DEnh

// DEnh + 아이템 능력치
DEnh + DamageItemCoef = DI

// DI * (1 + (1 링크 시 증가 데미지 * 링크 퍼센티지 총량)) = DL
DI * (1 + (DamageLinkCoef * Link)) = DL

// DL * (1 + 데미지 버프(이거 아이템인 경우도 있으면 여기에 추가해야될 수도 있음)) = Damage
DL * (1 + DamageBuffCoef) = Damage

// Damage * 스킬계수 = 최종 스킬 데미지
Damage * SkillCoef = SkillDamage
```

