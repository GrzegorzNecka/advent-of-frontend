export type Lokalizacja = { x: number; y: number; z: number; czas: number } | null;

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number;

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja {
    if (!lokalizacje.length || !lokalizacje) {
        return null;
    }

    const reducer = (total: Lokalizacja, current: Lokalizacja) => {
        if (!total || !current) {
            return null;
        }

        const sumCurrent = mapa(current?.x, current?.y, current?.z, current?.czas);
        const sumTotal = mapa(total?.x, total?.y, total?.z, total?.czas);

        return !sumTotal || !sumCurrent ? null : sumCurrent > sumTotal ? current : total;
    };

    return lokalizacje.reduce(reducer, lokalizacje[0]);
}
