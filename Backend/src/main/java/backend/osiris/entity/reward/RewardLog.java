package backend.osiris.entity.reward;

import backend.osiris.entity.BaseEntity;
import backend.osiris.entity.authentication.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "reward_log")
public class RewardLog extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private RewardType type;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "note", nullable = false)
    private String note;
}