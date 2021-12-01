import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rate } from '.';

import { TCurrencySymbols } from '../constants';

@Entity()
export class Price {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('timestamptz')
    public date: Date;

    @Column('text')
    public name: TCurrencySymbols;

    @OneToMany(
        () => Rate,
        rate => rate.price,
        {
            cascade: true,
        },
    )
    public rates: Rate[];
}
