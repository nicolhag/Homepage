import java.util.Scanner;
import java.io.*;

class Returverdier{
    public static void main(String[] args) throws Exception{
        /*
        setter beboere-arrayet til aa vaere resultatet av aa
        kalle paa fyllArrayFraFil-metoden. Da kan jeg bruke
        arrayet utover i main.
        */
        String[] beboere = fyllArrayFraFil();
    }

    public static String[] fyllArrayFraFil() throws Exception{
        File fil = new File("beboere.txt");
        Scanner filLeser = new Scanner(fil);

        int antall = Integer.parseInt(filLeser.nextLine());
        String[] navn = new String[antall];
        for(int i = 0; i < navn.length; i++){
            navn[i] = filLeser.nextLine();
        }
        return navn;
    }
}
