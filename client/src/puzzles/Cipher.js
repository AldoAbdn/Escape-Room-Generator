import Puzzle from './Puzzle';
import encoders from '../ciphers/encoders.json';
import decoders from '../ciphers/decoders.json';
class Cipher extends Puzzle{
    constructor(cipherType="pigpen",encoder=encoders['pigpen'],decoder=decoders['pigpen']){
        super('Cipher')
        this.cipherType = cipherType;
        this.encoderDATA = encoder;
        this.decoderDATA = decoder;
    }
}
export default Cipher;