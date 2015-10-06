import java.util.Scanner;

/*
- Et enkelt program for aa beregne egenandelskrav for kjop av bolig (15%).
- Man kan skrive inn f. eks. en egenandel paa "300" eller "300000" --> begge blir til 300 000
- Se bort i fra den spesielle formateringen (ikke pensum)
- Konsepter fra pensum: Variabler, innlesing (Scanner), if-else, modifiserbar while-lokke


Eksempel paa interaksjon med bruker under;

Skriv inn egenandel:
300

****Med 300,000 i egenandel kan du kjope leilighet til 2,000,000 - hvor lanebeløpet blir 1,700,000****

Skriv inn ny egenandel:

*/
class BoligKalkulator{
    public static void main(String[] args) {

        Scanner terminal = new Scanner(System.in);
        String lestLinje = "1"; // Jeg setter den til den "1" for å komme inn i while-løkken første gang
        int prosentKrav = 15;

        while (! lestLinje.equals("0") ){
            System.out.println("Skriv inn ny egenandel, eller 0 for a avslutte: ");
            lestLinje = terminal.nextLine();
            int egenandel = Integer.parseInt(lestLinje);

            if (egenandel<1000){
                egenandel = egenandel * 1000;
            }

            if (egenandel==0){
                System.out.println("Takk for i dag!");
            } else {
                int kjopesum = (egenandel/prosentKrav)*100;
                int faktiskKjopesum = kjopesum - egenandel;

                System.out.print("\n****");
                System.out.format("Med %,5d i egenandel", egenandel);
                System.out.format(" kan du kjope leilighet til %,8d", kjopesum);

                System.out.format(" - hvor laanebelopet blir %,8d", faktiskKjopesum);
                System.out.println("****\n");
            }
        }
    }
}
